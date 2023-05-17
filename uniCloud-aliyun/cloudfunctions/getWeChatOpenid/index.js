'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event, context)

	const url = 'https://api.weixin.qq.com/sns/jscode2session'

	const res = await uniCloud.httpclient.request(url, {
		data: {
			appid: 'wx4035e8a9168df656',
			secret: 'd55577bd1e902e393a43716926dd3ff4',
			grant_type: 'authorization_code',
			js_code: event.code
		},
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})

	const openid = res.data.openid


	//返回数据给客户端
	return {
		openid
	}
};