
// 服务运行端口
const server_port = "996";

// 数据文件模式 js or json
const data_mode = "js";

// 数据文件夹名
const data_folder_name = "data";

// 数据文件夹名 *目前仅可使用excel
const record_mode = "excel";

// 记录文件夹名
const record_folder_name = 'record'

// 记录文件名
const record_file_name = 'record_file'

// 延迟返回时间
// Boolean: true=666ms; false=0ms; Fixed value.
// Object: { min: 0, max: 666 }; Random value.
// Array: Fixed value, randomly taken from an array.
const latency_time = false





module.exports = {
    server_port,
    data_mode,
    data_folder_name,
    record_mode,
    record_folder_name,
    record_file_name,
    latency_time
};