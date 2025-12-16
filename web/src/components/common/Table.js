import { capitalize, reduceClass } from 'lib'
import React from 'react'
import Text from './Text'

const Table = ({ columns = [], data = [] }) => {

  return (
    <table
      className={reduceClass([
        'w-full'
      ])}
    >
      <thead>
        <tr>
          {columns.map((x, i) => (
            <th
              key={i}
              className={reduceClass([
                'border-4',
                'p-2'
              ])}
            >
              <Text bold>
                {capitalize(x)}
              </Text>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((key, i) => (
              <th
                key={i}
                className={reduceClass([
                  'border-2',
                  'border-t-0',
                  'p-2'
                ])}
              >
                <Text med>
                  {row[key]}
                </Text>
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table