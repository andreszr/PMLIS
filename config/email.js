var generator = require('xoauth2').createXOAuth2Generator({
    user: 'oandreszr@gmail.com',
    clientId: '776363189244-q6kso3dtm1ft49stmcl1rjm5tgp499eh.apps.googleusercontent.com',
    clientSecret: 'iTUw0CN_UA8i1U1vtW56pGeo',
    refreshToken: '1/hSGAivINYchxHYz-3Ou46OhYugsO430sI2wRexbcgx8',
    accessToken: 'ya29.Ci-jA3_ZZbwvljNMsLESExt1jn_f_UGUH36YI7uPr0e5ovdZ3sqTVTGVgB-pNcYpRg' // optional
});

module.exports.email = {
	 service: "Gmail",
	 auth: {
		 xoauth2:generator
	 },
	 templateDir: "api/emailTemplates",
	 from: "oandreszr@gmail.com",
	 testMode: false,
};