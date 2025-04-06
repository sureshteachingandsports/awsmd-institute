export const emailTemplates = {
  welcome: {
    templateId: 'd-xxxxxxxxxxxxxxxxxxxxxxxx',
    getData: (email: string) => ({
      email,
      date: new Date().toLocaleDateString(),
      getStartedUrl: 'https://awsmd.edu/get-started'
    })
  },
  courseUpdate: {
    templateId: 'd-yyyyyyyyyyyyyyyyyyyyyyyy',
    getData: (data: { email: string; courseName: string; updateType: string }) => ({
      email: data.email,
      courseName: data.courseName,
      updateType: data.updateType,
      date: new Date().toLocaleDateString()
    })
  },
  newsletter: {
    templateId: 'd-zzzzzzzzzzzzzzzzzzzzzzzz',
    getData: (data: { email: string; content: string }) => ({
      email: data.email,
      content: data.content,
      date: new Date().toLocaleDateString(),
      unsubscribeUrl: `https://awsmd.edu/unsubscribe?email=${encodeURIComponent(data.email)}`
    })
  }
}; 