import Realm from 'realm'
import { RealmSchema } from './all_schemes';

let SCHEMA_VERSION = 4

function findFirstUsuario() {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })

    let allObjects = realm.objects('Usuario').filtered("removido=false")
    return(allObjects[0])
}

function findAll(schemaName) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })

    let allObjects = realm.objects(schemaName)
    return(allObjects)
}

function isEmpty(schemaName) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })
    let allObjects = realm.objects(schemaName)
    return allObjects.length==0
}

function isNotEmpty(schemaName) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })
    let allObjects = realm.objects(schemaName)
    return allObjects.length>0
}

function findAllNotRemoved(schemaName, sort, invert, secondSort, secondInvert) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })

    let objectsToReturn = realm.objects(schemaName).filtered("removido=false")
    if (objectsToReturn.length==0) {
        return []
    } else {
        if (sort!==undefined) {
            if (invert!==undefined) {
                if (secondSort!==undefined) {
                    objectsToReturn = objectsToReturn.sorted(sort, invert).sorted(secondSort, invert)                    
                } else {
                    objectsToReturn = objectsToReturn.sorted(sort, invert)
                }
            } else {
                if (secondSort!==undefined) {
                    objectsToReturn = objectsToReturn.sorted(sort, false).sorted(secondSort, secondInvert)                    
                } else {
                    objectsToReturn = objectsToReturn.sorted(sort, false)
                }
            }
        }
        return objectsToReturn
    }
}

function removeAll() {
    let realm = new Realm({
        schemaVersion: SCHEMA_VERSION
    })
    realm.beginTransaction()
    realm.deleteAll()
    realm.commitTransaction()
}

function findLastNotRemoved(schemaName) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })    

    let objects = realm.objects(schemaName).filtered("removido=false")
    let objectToReturn = objects[objects.length-1]
    return objectToReturn
}

function findFirstNotRemoved(schemaName) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })    

    let objects = realm.objects(schemaName).filtered("removido=false")
    let objectToReturn = objects[0]
    return objectToReturn
}

function findByFilter(schemaName, filter, sort) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })  

    let objects = realm.objects(schemaName)
    let objectsToReturn = objects.filtered(filter)
    if (sort!==undefined) {
        objectsToReturn = objectsToReturn.sorted(sort.field, sort.up)
    }
    return objectsToReturn
}

function findFirstByFilter(schemaName, filter, sort) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })  

    let objects = realm.objects(schemaName)
    if (sort!==undefined) {
        objects = objects.sorted(sort, false)
    }
    let objectsToReturn = objects.filtered(filter)[0]
    
    return objectsToReturn
}

function findLastByFilter(schemaName, filter, sort) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })  

    let objects = realm.objects(schemaName)
    let objectsToReturn = objects.filtered(filter)
    if (sort!==undefined) {
        objectsToReturn = objectsToReturn.sorted(sort, false)
    }
    return objectsToReturn[objectsToReturn.length-1]
}

function getNextMid(schemaName) {
    let mid = 0
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    });    

    realm.objects(schemaName).forEach(element => {
        if (element.mid>mid) {
            mid = element.mid
        }
    });

    return mid+1
}

function getMidByUUID(schemaName, uuid) {
    let mid = 0
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    });    

    let filter = 'removido = false AND uuid LIKE "'+uuid+'"'

    let objects = realm.objects(schemaName)
    let objectsToReturn = objects.filtered(filter)
    
    if (objectsToReturn.length>0) {
        return objectsToReturn[0].mid
    } else {
        let mid = 0
        objects.forEach(element => {
            if (element.mid>mid) {
                mid = element.mid
            }
        })
        return mid+1
    }
}

function saveThis(schemaName, object) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    });
    let objectToSave = object
    
    realm.write(() => {
        realm.create(schemaName, objectToSave)
    })
}

function updateThis(schemaName, object, fields) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    });

    let objectExist = realm.objectForPrimaryKey(schemaName, object.mid)

    if (object!=undefined && objectExist!=undefined) {
        realm.write(() => {
            fields.map((it) => {
                if (object[it]!=undefined) {
                    objectExist[it] = object[it]
                }
            })
        })
    }
}

function deleteThis(schemaName, mid) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })

    realm.write(() => {
        let objectExist = realm.objectForPrimaryKey(schemaName, mid)
        realm.delete(objectExist)
    })
}

function deleteObjects(schemaName) {
    let realm = new Realm({
        schema: RealmSchema,
        schemaVersion: SCHEMA_VERSION
    })
    
    let objects = realm.objects(schemaName)
    realm.beginTransaction()
    realm.delete(objects)
    realm.commitTransaction()
    
}

export {
    findAll,
    isEmpty,
    isNotEmpty,
    findAllNotRemoved,
    removeAll,
    findLastNotRemoved,
    findFirstNotRemoved,
    findByFilter,
    findFirstByFilter,
    findLastByFilter,
    getNextMid,
    getMidByUUID,
    saveThis,
    updateThis,
    deleteThis,
    findFirstUsuario,
    deleteObjects
}