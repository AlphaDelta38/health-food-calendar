import { TransformToElasticSearcProps } from "../types/utils.js";


const transformToElasticSearcQuery = (props: TransformToElasticSearcProps) => {

  if (!props.query && !props.fields) {
    return "";
  } else if (props.query && !props.fields) {
    return `${props.query}`;
  }

  const { query, fields } = props;

  let queryString = ``;

  if (query) {
    queryString += `${query} AND `;
  }
  
  if (fields) {

    for (const key in fields) {
      const fieldValue = fields[key];

      const isArray = Array.isArray(fieldValue);

      if (isArray && fieldValue.length > 0) {
        const elements = fieldValue.map(v => `${key}:\"${v}\"`).join(" OR ");
        queryString += `(${elements})`
      } else if (!isArray) {
        queryString += `${key}:\"${fieldValue}\"`;
      }

    }

  }
  console.log(queryString);
  return queryString;
}


export {
  transformToElasticSearcQuery
}