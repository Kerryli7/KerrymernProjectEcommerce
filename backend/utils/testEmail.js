const sendEmail = require('./sendEmail'); // 替换为 sendEmail 函数所在的实际路径

async function testSendEmail() {
    try {
        await sendEmail({
            email: 'kerryli6540@example.com', // 替换为您要发送到的目标邮箱地址
            subject: 'Test Email from NodeMailer',
            message: 'This is a test email sent from NodeMailer.'
        });

        console.log('邮件发送成功');
    } catch (error) {
        console.error('邮件发送失败', error);
    }
}

testSendEmail();