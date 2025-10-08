import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

router.post('/send', async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // ✨ تصميم الإيميل الأسود والأبيض الأنيق
    const html = `
      <div style="background-color: #f9f9f9; color: #111; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; max-width: 600px; margin: 30px auto; border: 1px solid #ddd; border-radius: 10px;">
        
        <h2 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #000; display: inline-block; padding-bottom: 6px; margin-bottom: 20px;">
          New Contact Message
        </h2>

        <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
          You have received a new message from your website contact form.
        </p>

        <div style="background: #fff; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject || 'No subject'}</p>

          <div style="margin-top: 20px; padding: 15px; background-color: #000; color: #fff; border-radius: 8px;">
            <p style="margin: 0; white-space: pre-line;">${message}</p>
          </div>
        </div>

        <div style="margin-top: 25px; text-align: center; font-size: 12px; color: #555;">
          <p>Sent via <strong>Salviaro Autos</strong> contact form</p>
          <p style="margin-top: 6px;">
            <a href="https://www.salviaro.autos" style="color: #000; text-decoration: none;">www.salviaro.autos</a>
          </p>
        </div>
      </div>
    `

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact: ${subject || 'No subject'}`,
      html
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true, message: 'Email sent successfully!' })

  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.toString() })
  }
})

export default router
