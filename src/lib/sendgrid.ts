import sgMail from '@sendgrid/mail';
import { emailTemplates } from './email-templates';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendWelcomeEmail(email: string) {
  const template = emailTemplates.welcome;
  try {
    await sgMail.send({
      to: email,
      from: 'noreply@awsmd.edu',
      templateId: template.templateId,
      dynamicTemplateData: template.getData(email)
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

export async function sendCourseUpdate(email: string, courseName: string, updateType: string) {
  const template = emailTemplates.courseUpdate;
  try {
    await sgMail.send({
      to: email,
      from: 'noreply@awsmd.edu',
      templateId: template.templateId,
      dynamicTemplateData: template.getData({ email, courseName, updateType })
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

export async function sendNewsletter(email: string, content: string) {
  const template = emailTemplates.newsletter;
  try {
    await sgMail.send({
      to: email,
      from: 'noreply@awsmd.edu',
      templateId: template.templateId,
      dynamicTemplateData: template.getData({ email, content })
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
} 