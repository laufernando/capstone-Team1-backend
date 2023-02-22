const nodemailer = require('nodemailer');

//build our controller that will have our CRUD and other methods for size
const sizeController = {
    //method to create a new size
    sedMessage: async function (req, res) {
      try {
        const { para, asunto, mensaje } = req.body;
        console.log("si llega aqui",para);
        const transporter = nodemailer.createTransport({
          host: 'smtprelay.lmig.com',
          port: 25,
          secure: false,
        });

        const info = await transporter.sendMail({
          from: 'Admin@SneakerFever.com',
          to: para,
          subject: asunto,
          html: `<p>${mensaje}</p>`,
        });

        console.log(`Message sent: ${info.messageId}`);
  
        //return the newly created size
        res.status(200).json({ message: "message send succesful", statusCode: res.statusCode });
      } catch (error) {
        //handle errors creating size
        console.log("failed to create newSize: " + error);
        res.status(400).json({
          message: error.message,
          statusCode: res.statusCode,
        });
      }
    },
  };
  
  
  
  module.exports = sizeController;