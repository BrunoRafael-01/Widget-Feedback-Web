import { SubmitFeedbackUC } from "./submit-feedback-uc"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback =  new SubmitFeedbackUC(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy}
);


describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })


  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  })

  

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: 'example comment',
      screenshot: 'teste.jpg'
    })).rejects.toThrow();
  })
})

