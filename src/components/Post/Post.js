import { Link } from "react-router-dom";
import "../css/posts.css";
import "../css/Card.scss"



export default function Post({poste}) {
  return (
      /*
    <div className="post">
      <img
        className="postImg"
        src={`data:image/png;base64, ${img}`}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Music
            </Link>
          </span>
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              Life
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            Lorem ipsum dolor sit amet
          </Link>
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
      </div>
      <p className="postDesc">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        officia architecto deserunt deleniti? Labore ipsum aspernatur magnam
        fugiat, reprehenderit praesentium blanditiis quos cupiditate ratione
        atque, exercitationem quibusdam, reiciendis odio laboriosam?
      </p>
    </div>*/
          <article className="postcard dark blue">
            <a className="postcard__img_link" href="#">
              <img className="postcard__img" src={`data:image/png;base64, ${poste.image}`} alt="Image Title"/>
            </a>
            <div className="postcard__text">
              <h1 className="postcard__title blue"><a href="#">{poste.title}</a></h1>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Mon, May 25th 2020
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">{poste.content}</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                  <a href={`/posteCommentaire/${poste.id}`}><i className="fas fa-play mr-2"></i>Comments</a>
                </li>
              </ul>
            </div>
          </article>

  );
}