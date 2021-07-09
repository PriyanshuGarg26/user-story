import React from 'react'
import { useForm } from 'react-hook-form'

import Button from './Button'
import FormError from '../components/FormError'

const CommentInput = (props) => {
  const {
    attachments,
    setAttachments,
    addCommentReply,
    commentReply,
    setCommentReply
  } = props

  const {
    register: registerReply,
    errors: errorsReply,
    handleSubmit: handleSubmitReply
  } = useForm()

  const mediaPreview = attachments.map((file) => (
    <div className='preview-root' key={file.name}>
      <div className='preview-inner'>
        <img src={file.preview} className='preview-image' alt='preview' />
      </div>
    </div>
  ))

  const handleFileChange = async (event) => {
    const newFiles = event.target.files
    const newFilesArray = []
    for (let i = 0; i < newFiles.length; i++) {
      newFilesArray.push(
        Object.assign(newFiles[i], {
          preview: URL.createObjectURL(newFiles[i])
        })
      )
    }
    setAttachments([...attachments, ...newFilesArray])
  }

  return (
    <form
      className='comment-form'
      onSubmit={handleSubmitReply(addCommentReply)}
    >
      <div className='comment-input'>
        <textarea
          rows='5'
          cols='25'
          name='Comments'
          ref={registerReply({ required: true })}
          value={commentReply}
          onChange={(e) => setCommentReply(e.target.value)}
        ></textarea>
        <div className='file-input'>
          <input
            type='file'
            id='file'
            className='file'
            multiple={true}
            onChange={handleFileChange}
          />
          <label htmlFor='file' className='file-button-label'>
            <i className='eos-icons'>attachment</i>
          </label>
        </div>
      </div>
      <div className='preview-container'>{mediaPreview}</div>
      {errorsReply.addReply && <FormError message='Reply cannot be empty' />}
      <Button className='btn btn-default'>Add Reply</Button>
    </form>
  )
}

export default CommentInput
