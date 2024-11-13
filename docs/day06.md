# 单元测试与模糊测试入门

## 单元测试

::: code-group

```go [/main.go]
package main

import "fmt"

func Reverse(s string) string {
    b := []byte(s)
    for i, j := 0, len(b)-1; i < len(b)/2; i, j = i+1, j-1 {
        b[i], b[j] = b[j], b[i]
    }
    return string(b)
}

func main() {
    input := "The quick brown fox jumped over the lazy dog"
    rev := Reverse(input)
    doubleRev := Reverse(rev)
    fmt.Printf("original: %q\n", input)
    fmt.Printf("reversed: %q\n", rev)
    fmt.Printf("reversed again: %q\n", doubleRev)
}

```

```go [/reverse_test.go]
package main

import (
    "testing"
)

func TestReverse(t *testing.T) {
    testcases := []struct {
        in, want string
    }{
        {"Hello, world", "dlrow ,olleH"},
        {" ", " "},
        {"!12345", "54321!"},
    }

    for _, tc := range testcases {
        rev := Reverse(tc.in)
        if rev != tc.want {
            t.Errorf("Reverse: %q, want %q", rev, tc.want)
        }
    }
}

```

:::

