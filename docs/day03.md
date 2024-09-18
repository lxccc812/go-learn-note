# 多模块工作区入门

## 多模块工作区入门

::: code-group

```go [/hello/hello.go]
package main

import (
    "fmt"

    "golang.org/x/example/hello/reverse"
)

func main() {
    fmt.Println(reverse.String("Hello"), reverse.Int(24601))
}

```

```go [/example/hello/reverse/int.go]
package reverse

import "strconv"

func Int(i int) int {
    i, _ = strconv.Atoi(String(strconv.Itoa(i)))
    return i
}

```

:::
