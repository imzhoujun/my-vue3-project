'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('index event : ', event)

	//返回数据给客户端
	return await db.collection('user-cart')
		.where(event.where)
		.update({
			index: dbCmd.inc(1)
		}).then(res => {
			return res
		}).catch(err => {
			return err
		})
};