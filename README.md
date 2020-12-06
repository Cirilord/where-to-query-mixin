# Where to query mixin

> :warning: Regex is not supported in this mixin!

> :warning: Geolocation is not supported in this mixin!

|  Key  |  Example  |  Output  |
| ------------------- | ------------------- | ------------------- |
|  -  |  { id: 10 } |  id = 10  |
|  eq  |  { id: { eq: 10 } } |  id = 10  |
|  and  |  { and: [{ id: 10 }, { id: 11 }] } |  (id = 10 AND id = 11)  |
|  or  |  { or: [{ id: 10 }, { id: 11 }] } |  (id = 10 OR id = 11)  |
|  gt  |  { id: { gt: 10 } } |  id > 10  |
|  gte  |  { id: { gte: 10 } } |  id >= 10  |
|  lt  |  { id: { lt: 10 } } |  id < 10  |
|  lte  |  { id: { lte: 10 } } |  id <= 10  |
|  between  |  { id: { between: [10, 11] } } |  id BETWEEN 10 AND 11  |
|  inq  |  { id: { inq: [10, 11] } } |  id IN (10, 11)  |
|  nin  |  { id: { nin: [10, 11] } } |  id NOT IN (10, 11)  |
|  neq  |  { id: { neq: 10 } } |  id <> 10  |
|  like  |  { id: { like: 'Superman' } } |  id LIKE 'Superman'  |
|  nlike  |  { id: { nlike: 'Superman' } } |  id NOT LIKE 'Superman'  |
|  ilike  |  { id: { ilike: 'Superman' } } |  id ILIKE 'Superman'  |
|  nilike  |  { id: { nilike: 'Superman' } } |  id NOT ILIKE 'Superman'  |

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