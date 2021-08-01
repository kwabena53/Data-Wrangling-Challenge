const { test, expect } = require('@jest/globals');
const {matchValueToHeader, sortByParam, cleanDataNBs} = require('./helpers')



const headers= ['name', 'age', 'location']
const values = ['kwabena', 19, 'Tema']
const result = {
    'name': 'kwabena',
    'location' : 'Tema'
}

const toSort = [
    {
        'name': 'kwabena',
        'location' : 'Tema',
        'age' : 19
    },
    {
        'name': 'Nhyira',
        'location' : 'Tema',
        'age' : 49
    },
    {
        'name': 'Sadie',
        'location' : 'Tema',
        'age' : 5
    },
]

const sortedAsc = [
    {
        'name': 'Sadie',
        'location' : 'Tema',
        'age' : 5
    },
    {
        'name': 'kwabena',
        'location' : 'Tema',
        'age' : 19
    },
    {
        'name': 'Nhyira',
        'location' : 'Tema',
        'age' : 49
    },
]

const sortedDesc = [
    {
        'name': 'Nhyira',
        'location' : 'Tema',
        'age' : 49
    },
    {
        'name': 'kwabena',
        'location' : 'Tema',
        'age' : 19
    },
    {
        'name': 'Sadie',
        'location' : 'Tema',
        'age' : 5
    }
]

const value = 'crataria†a crataria†a'
const cleanVal = 'crataria crataria'

test('matching header to values', () => {
    expect(matchValueToHeader(headers, values, [1])).toEqual(result);
  });

test('sorting by a param indicator ascending', () => {
    expect(sortByParam(toSort, 'age', 'asc')).toEqual(sortedAsc)
})

test('sorting by a param indicator desc', () => {
    expect(sortByParam(toSort, 'age', 'desc')).toEqual(sortedDesc)
}) 

test('clean a value', () => {
    expect(cleanDataNBs(value)).toEqual(cleanVal)
})