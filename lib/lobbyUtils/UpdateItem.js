class UpdateItem {
  static async applyUpdates(updateItem = new UpdateItem()) {
    const updateList = updateItem.getValues()

    for (const [obj, updates] of updateList) {
      await obj.updateOne(updates, { new: true })
    }
  }
  
  constructor() {
    this._innerMap = new Map()
  }

  add(object, key, value, operation = '$set') {
    if(this._innerMap.has(object)) {
      const obj = this._innerMap.get(object)

      if(!obj[operation]) {
        obj[operation] = {
          [key]: value
        }

        return
      }

      obj[operation][key] = value

      return
    }

    this._innerMap.set(object, {
      [operation]: {
        [key]: value
      }
    })
  }

  getValues() {
    return [...this._innerMap.entries()].map(([obj, vals]) => {
      return [obj, vals]
    })
  }

  combine(updateItem = new UpdateItem()) {
    updateItem._innerMap.forEach((operations, obj) => {
      for (const operationName in operations) {
        if (!Object.hasOwn(operations, operationName)) continue
        
        const operation = operations[operationName]

        for (const key in operation) {
          this.add(obj, key, operation[key], operationName) 
        }
      }
    })
  }
}

export default UpdateItem