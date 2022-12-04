import _ from 'lodash';

const build = (obj1, obj2) => {
const keys = _.union(_.keys(obj1), _.keys(obj2));
const keysSort = _.sortBy(keys);
const result = [];
for (const key of keysSort) {
const val1 = obj1[key];
const val2 = obj2[key];
if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && val1 === val2) {
result.push({key, value: obj1[key], type: 'unchanged'});
}
if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key) && val1 !== val2) {
result.push({key, value: obj1[key], type: 'changed', valueBefore: 'before'},
{key, value: obj2[key], type: 'changed', valueAfter: 'after'});
}
if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
result.push({key, value: obj2[key], type: 'added'});
}
if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
result.push({key, value: obj1[key], type: 'deleted'});
}
}
return result
};

export default build;
