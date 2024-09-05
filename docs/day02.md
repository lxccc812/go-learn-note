## 函数的声明与调用

- 函数的声明
```go
// /home/greetings/greetings.go
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
```mod
// /home/greetings/go.mod
// cd
// go mod init example.com/greetings
module example.com/greetings

go 1.23.0

```
- 函数的调用
```go
// /home/hello/hello.go
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
```mod
// /home/hello/go.mod
// cd
// go mod init example.com/hello
// go mod edit -replace example.com/greetings=../greetings
// go mod tidy
module example.com/hello

go 1.23.0

replace example.com/greetings => ../greetings

require example.com/greetings v0.0.0-00010101000000-000000000000

```