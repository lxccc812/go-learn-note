## Hello World  :tada:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}

```

## 使用外部包
```go
package main

import (
	"fmt"
	"rsc.io/quote"
)

func main() {
	fmt.Println(quote.Go())
}

```
