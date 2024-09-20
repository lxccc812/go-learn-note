# 泛型的使用

## 类型的声明

```go
type Number interface {
    int64 | float64
}

```

## 泛型的使用
```go
func SumNumbers[K comparable, V Number](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }

    return s
}

```

> [!NOTE] 注释
> comparable 关键字来指代golang中所有可以用 `!=` 或者 `==` 来进行比较的元素(Boolean/Integer/Float/Complex/String/Pointer/Channel/Interface)
