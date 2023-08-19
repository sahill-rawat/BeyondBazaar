class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryStrCopy = {...this.queryStr};
    const removeFields = ['keyword', 'page', 'limit'];

    removeFields.forEach(field=> delete queryStrCopy[field]);

    // filter for price and rating
    let copy = JSON.stringify(queryStrCopy);
    copy = copy.replace(/\b(lt|lte|gt|gte)\b/g, key=> `$${key}`);

    this.query = this.query.find(JSON.parse(copy));
    return this;
  }

  pagination(productPerPage) {
    const page = this.queryStr.page || 1; 
    const skip = productPerPage * (page-1);
    this.query =  this.query.limit(productPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
