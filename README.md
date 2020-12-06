# where-to-query-mixin

```javascript
let where = {
    id: 10
}

// WHERE id = 10
```

```javascript
let where = {
    or: [{ id: 10 }, { id: 11 }]
}

// WHERE (id = 10 OR id = 11)
```