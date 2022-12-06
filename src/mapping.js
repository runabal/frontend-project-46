const mappingFile = (files) => {
  const data = [];
  files.forEach((file) => {
    if (file.type === 'unchanged') data.push(`   ${file.key}: ${file.value}`);
    if (file.type === 'deleted') data.push(` - ${file.key}: ${file.value}`);
    if (file.type === 'changed' && file.valueAfter === 'after') data.push(` + ${file.key}: ${file.value}`);
    if (file.type === 'changed' && file.valueBefore === 'before') data.push(` - ${file.key}: ${file.value}`);
    if (file.type === 'added') data.push(` + ${file.key}: ${file.value}`);
  });
  const result = data.join('\n');
  return `{\n${result}\n}`;
};
export default mappingFile;
