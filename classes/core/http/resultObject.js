module.exports = function() {
    this.status = 200
    this.message = "성공하였습니다."
    this.result = {}
    this.responseDate = new Date().getTime();
};