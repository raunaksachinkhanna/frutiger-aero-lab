import { SAMPLE_COMMENTS, SAMPLE_POSTS } from '../data/samplePosts'
import type { ThemeId } from 'aero-theme/src/tokens'
import './RedditMock.css'

interface RedditMockProps {
  themed: boolean
  theme?: ThemeId
  showComments?: boolean
}

/**
 * A fictional, Reddit-shaped feed used only to demonstrate AeroReddit's
 * theming. All content is invented sample data (see src/data/samplePosts.ts)
 * — this is not live Reddit data and requires no Reddit account.
 */
export function RedditMock({
  themed,
  theme = 'vista-glass',
  showComments,
}: RedditMockProps) {
  return (
    <div
      className={themed ? 'reddit-mock reddit-mock--aero' : 'reddit-mock'}
      data-aero-theme={themed ? theme : undefined}
    >
      <div className="reddit-mock__nav">
        <span className="reddit-mock__logo" aria-hidden="true" />
        <div className="reddit-mock__search">Search AeroReddit (sample data)</div>
      </div>

      <div className="reddit-mock__feed">
        {SAMPLE_POSTS.map((post) => (
          <article key={post.id} className="reddit-mock__post">
            <div className="reddit-mock__vote">
              <span
                className="reddit-mock__arrow reddit-mock__arrow--up"
                aria-hidden="true"
              />
              <span className="reddit-mock__score">{post.score.toLocaleString()}</span>
              <span
                className="reddit-mock__arrow reddit-mock__arrow--down"
                aria-hidden="true"
              />
            </div>
            <div className="reddit-mock__body">
              <p className="reddit-mock__meta">
                {post.subreddit} · {post.author} · {post.timeAgo}
              </p>
              <h3 className="reddit-mock__title">{post.title}</h3>
              <p className="reddit-mock__excerpt">{post.body}</p>
              <p className="reddit-mock__footer">{post.comments} comments · Share</p>
            </div>
          </article>
        ))}
      </div>

      {showComments && (
        <div className="reddit-mock__comments">
          <h4>Comments (sample)</h4>
          {SAMPLE_COMMENTS.map((comment) => (
            <div key={comment.id} className="reddit-mock__comment">
              <p className="reddit-mock__comment-meta">
                {comment.author} · {comment.score} points · {comment.timeAgo}
              </p>
              <p>{comment.body}</p>
              {comment.replies?.map((reply) => (
                <div
                  key={reply.id}
                  className="reddit-mock__comment reddit-mock__comment--reply"
                >
                  <p className="reddit-mock__comment-meta">
                    {reply.author} · {reply.score} points · {reply.timeAgo}
                  </p>
                  <p>{reply.body}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
