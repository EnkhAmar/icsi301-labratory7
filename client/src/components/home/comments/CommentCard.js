import React, { useState, useEffect } from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'

import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from './CommentMenu'
import { updateComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction'

const CommentCard = ({ comment, post }) => {
    const { auth } = useSelector(state => state) 
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)

    const [isLike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    
    useEffect(() => {
        setContent(comment.content)
        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        }
    }, [comment, auth.user._id])

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth }))
            setOnEdit(false)
        } else {
            setOnEdit(false)
        }
    }

    const handleLike = async () => {
        if (loadLike) return
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeComment({ comment, post, auth }))
        setLoadLike(false)
    }

    const handleUnLike = async () => {
        if (loadLike) return
        setIsLike(false)

        setLoadLike(true)
        await dispatch(unLikeComment({ comment, post, auth }))
        setLoadLike(false)
    }

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    return (
        <div className="comment_card mt-2" style={styleCard}>
            <Link to={`/profile/${comment.user._id}`}>
                <Avatar src={comment.user.avatar} size="small-avatar" className="d-flex text-dark" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill">
                    {
                        onEdit
                        ? <textarea rows="5" value={content}
                        onChange={e => setContent(e.target.value)} />
                        : <div>
                            <span>
                                {
                                    content.length < 100 ? content :
                                    readMore ? content  + ' ' : content.slice(0, 100) + '...'
                                }
                            </span>
                            {
                                content.length > 100 &&
                                <span className="readMore" onClick={() => setReadMore(!readMore)}>
                                    {readMore ? 'Show less' : 'Read more'}
                                </span>
                            }
                        </div>
                    }
                    

                    <div style={{ cursor: 'pointer' }}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="font-weight-bold mr-3">
                            {comment.likes.length} likes
                        </small>
                        {
                            onEdit 
                            ? <>
                                <small className="font-weight-bold mr-3"
                                onClick={handleUpdate}>
                                    update
                                </small>
                                <small className="font-weight-bold mr-3"
                                onClick={() => setOnEdit(false)}>
                                    cancel
                                </small>
                            </>
                            : <small className="font-weight-bold mr-3">
                                reply
                            </small>
                        }
                    </div>
                    
                </div>
            
                <div className="d-flex align-items-center mx-2" style={{ cursor: 'pointer' }}>
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>
            </div>

            
        </div>
    )
}

export default CommentCard
