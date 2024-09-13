# 函数的使用及错误处理

## 函数的声明

::: code-group

```go [/home/greetings/greetings.go]
package greetings

import "fmt"

func Hello(name string) string {
    // := 快捷声明变量的语法糖
    // var message string
    // message = fmt.Sprintf("Hi, %v. Welcome!", name)
	message := fmt.Sprintln("Hi, %v. Welcome", name)
	return message
}

```

```mod [/home/greetings/go.mod]
// cd
// go mod init example.com/greetings
module example.com/greetings

go 1.23.0

```

:::

## 函数的调用

::: code-group

```go [/home/hello/hello.go]
package main

import (
    "fmt"

    "example.com/greetings"
)

func main() {
    message := greetings.Hello("Lee")
    fmt.Println(message)
}

```

```mod [/home/hello/go.mod]
// cd
// go mod init example.com/hello
// go mod edit -replace example.com/greetings=../greetings
// go mod tidy
module example.com/hello

go 1.23.0

replace example.com/greetings => ../greetings

require example.com/greetings v0.0.0-00010101000000-000000000000

```

:::

## 错误处理, 异常捕获

引入 `errors` 包, 函数返回多值, 使用 if 判断 `nil` 作为占位符返回没用错误的情况

::: code-group

```go [/home/greetings/greetings.go]
package greetings

import "fmt"                                           // [!code --]
import (                                               // [!code ++]
    "errors"                                           // [!code ++]
    "fmt"                                              // [!code ++]
)                                                      // [!code ++]

func Hello(name string) string {                       // [!code --]
func Hello(name string) (string, error) {              // [!code ++]
    if name == "" {                                    // [!code ++]
        return "", errors.New("name is empty")         // [!code ++]
    }                                                  // [!code ++]

    message := fmt.Sprintf("Hi, %v. Welcome!", name)
    return message                                     // [!code --]
    return message, nil                                // [!code ++]
}

```

```go [/home/hello/hello.go]
package main

import (
    "fmt"
    "log"                                              // [!code ++]

    "example.com/greetings"
)

func main() {
    log.SetPrefix("greetings: ")                       // [!code ++]
    log.SetFlags(0)                                    // [!code ++]

    message, err := greetings.Hello("")                // [!code ++]
    if err != nil {                                    // [!code ++]
        log.Fatal(err)                                 // [!code ++]
    }                                                  // [!code ++]

    fmt.Println(message)
}

```

:::

## 随机函数的引用

```go [/home/greetings/greetings.go]
import (
    "errors"
    "fmt"
    "math/rand"  // [!code ++]
)

func randomFormat() string {    // [!code ++] 
    formats := []string{    // [!code ++]
        "Hi, %v. Welcome!", // [!code ++]
        "Great to see you, %v!",    // [!code ++]
        "Hail, %v! Well met!",  // [!code ++]
    }   // [!code ++]
    return formats[rand.Intn(len(formats))]     // [!code ++]
}   // [!code ++]

randomFormat()    // [!code ++]

```

## for 的使用
::: code-group

```go [/home/greetings/greetings.go]
package greetings

import (
    "errors"
    "fmt"
    "math/rand"
)

func Hello(name string) (string, error) {
    if name == "" {
        return "", errors.New("name is empty")
    }

    message := fmt.Sprintf(randomFormat(), name)
    return message, nil
}

func Hellos(names []string) (map[string]string, error) {    // [!code ++]
    messages := make(map[string]string) // [!code ++]
    for _, name := range names {    // [!code ++]
        message, err := Hello(name) // [!code ++]
        if err != nil { // [!code ++]
            return nil, err // [!code ++]
        }   // [!code ++]

        messages[name] = message    // [!code ++]
    }   // [!code ++]
    return messages, nil    // [!code ++]
}   // [!code ++]

func randomFormat() string {
    formats := []string{
        "Hi, %v. Welcome!",
        "Great to see you, %v!",
        "Hail, %v! Well met!",
    }

    return formats[rand.Intn(len(formats))]
}

```

```go [/home/hello/hello.go]
package main

import (
    "fmt"
    "log"

    "example.com/greetings"
)

func main() {
    log.SetPrefix("greetings: ")
    log.SetFlags(0)

    // message, err := greetings.Hello("Lee")    // [!code --]
    names := []string{"Gladys", "Samantha", "Darrin"}    // [!code ++]
    message, err := greetings.Hellos(names)    // [!code ++]

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(message)
}

```

:::

## `test` 测试
::: code-group

```go [/home/greetings/greetings.go]
package greetings

import (
    "errors"
    "fmt"
)

func Hello(name string) (string, error) {
    if name == "" {
        return "", errors.New("name is empty")
    }

    message := fmt.Sprintf(randomFormat(), name) // test success    // [!code highlight]
    // message := fmt.Sprintf(randomFormat()) // test error         // [!code highlight]
    return message, nil
}

```

```go [/home/greetings/greetings_test.go]
package greetings

import (
    "regexp"
    "testing"
)

func TestHello(t *testing.T) {
    name := "Gladys"
    want := regexp.MustCompile(`\b` + name + `\b`)
    msg, err := Hello("Gladys")

    if !want.MatchString(msg) || err != nil {
        t.Fatalf(`Hello("Gladys") = %q, %v, want match for %#q, nil`, msg, err, want)
    }
}

func TestHelloEmpty(t *testing.T) {
    msg, err := Hello("")
    if msg != "" || err == nil {
        t.Fatalf(`Hello("") = %q, %v, want "", error`, msg, err)
    }
}

```

:::

- 命令行测试
  - `cd /home/greetings/`
  - `go test`

## 编译与安装
```shell
cd /home/hello
go build  # 编译成可执行文件
go list -f '{{.Target}}'  # 查看 go 安装路径
go install  # 安装
```
