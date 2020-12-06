'use strict'

function type(value) {

    return typeof value === 'string' ? `'${value}'` : value
}

function typeValue(key, _key, value) {

    if (_key === 'eq')
        return `${key} = ${type(value)}`
    else if (_key === 'neq')
        return `${key} <> ${type(value)}`
    else if (_key === 'inq' || _key === 'nin') {

        let values = '('

        for (let i = 0; i < value.length; i++) {

            values += type(value[i])

            if (i < (value.length - 1))
                values += ', '
            else
                values += ')'
        }

        return `${key} ${_key === 'inq' ? 'IN' : 'NOT IN'} ${values}`
    }
    else if (_key === 'gt' || _key === 'gte' || _key === 'lt' || _key === 'lte') {

        const operator =
            _key === 'gt' ? '>' :
                _key === 'gte' ? '>=' :
                    _key === 'lt' ? '<' : '<='

        return `${key} ${operator} ${type(value)}`
    }
    else if (_key === 'between' && typeof value === 'object' && Array.isArray(value) && typeof value[0] === 'number' && typeof value[1] === 'number')
        return `${key} BETWEEN ${value[0]} AND ${value[1]}`
    else if (_key === 'like' || _key === 'nlike' || _key === 'ilike' || _key === 'nilike')
        return `${key} ${_key === 'nlike' || _key === 'nilike' ? 'NOT' : '' + _key} ${type(value)}`
    else if (_key === 'regexp')
        throw new Error('Regex is not supported in this mixin')
    else if (_key === 'near')
        throw new Error('Geolocation is not supported in this mixin')
}

function queryBuilder(where = {}) {

    let query = ''

    let attr = Object.keys(where).length

    for (const key in where) {

        if (typeof where[key] === 'object') {

            if (Array.isArray(where[key])) {

                if (key === 'and' || key === 'or') {

                    query += '('

                    for (let i = 0; i < where[key].length; i++) {

                        const _key = Object.keys(where[key][i])[0]

                        if (typeof where[key][i][_key] === 'object')
                            for (const aKey in where[key][i][_key])
                                query += typeValue(_key, aKey, where[key][i][_key][aKey])
                        else
                            query += `${_key} = ${type(where[key][i][_key])}`

                        if (i < (where[key].length - 1))
                            query += ` ${key} `
                        else
                            query += ')'
                    }
                }
            }
            else
                for (const _key in where[key])
                    query += typeValue(key, _key, where[key][_key])
        }
        else
            query += `${key} = ${type(where[key])}`

        if (--attr)
            query += '\nAND\n'
    }

    return query
}

module.exports = queryBuilder