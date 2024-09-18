const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

module.exports = {
  //New members being added to a project
  newUserEmail: async function (emailId, senderEmail, projectId, projectName, first, last) {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "gayle@syncronize.com.au", // Your email address
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    try {
      await transporter.verify();
      readHTMLFile(__dirname + "/newEmailTemplate.html", function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        const template = handlebars.compile(html);
        const emailSub = "You've been invited to join SYNCRONIZE.";
        const replacements = {
          username: first + " " + last,
          userEmail: senderEmail,
          projectName: projectName,
          email: emailId,
          projectId: projectId,
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: process.env.SMTP_MAIL,
          to: emailId,
          subject: emailSub,
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  },
  //Existing members being added to a project
  existingUserEmail: async function (emailId, senderEmail, projectId, projectName, first, last, userToken) {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "gayle@syncronize.com.au", // Your email address
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    try {
      await transporter.verify();
      readHTMLFile(__dirname + "/emailTemplates.html", function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        const template = handlebars.compile(html);
        const emailSub = "You've been invited to join a SYNCRONIZE project";
        const replacements = {
          username: first + " " + last,
          userEmail: senderEmail,
          projectName: projectName,
          email: emailId,
          projectId: projectId,
          userToken: userToken
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: process.env.SMTP_MAIL,
          to: emailId,
          subject: emailSub,
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  },
};
