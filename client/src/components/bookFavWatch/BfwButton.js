import React from "react";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  MdOutlineBookmarkBorder,
  MdOutlineBookmark,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
} from "react-icons/md";
import { BiPlus } from "react-icons/bi";

import Dropdown from "react-bootstrap/Dropdown";
function BfwButton({
  kind,
  type,
  addBookMark,
  bookmarkedIds,
  favouriteIds,
  addFavourite,
  item,
}) {
  return (
    <>
      {kind === "btnContainer" && type !== "season" && (
        <>
          {bookmarkedIds.includes(item.id.toString()) ? (
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => (
                <Tooltip {...props}>Remove From Wishlist</Tooltip>
              )}
              placement="bottom"
            >
              <Button
                onClick={(e) => addBookMark(e, item.id, type)}
                className="btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 "
              >
                <MdOutlineBookmark className="bookmark_icon text-secondry" />
              </Button>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => <Tooltip {...props}>Add to Wishlist</Tooltip>}
              placement="bottom"
            >
              <Button
                onClick={(e) => addBookMark(e, item.id, type)}
                className="btn-outline bookmark-btn text-white d-flex justify-content-end gap-2 "
              >
                <MdOutlineBookmarkBorder className="bookmark_icon " />
              </Button>
            </OverlayTrigger>
          )}
          {favouriteIds.includes(item.id.toString()) ? (
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => (
                <Tooltip {...props}>Remove From Favourites</Tooltip>
              )}
              placement="bottom"
            >
              <Button
                onClick={(e) => addFavourite(e, item.id, type)}
                className="btn-outline fav-btn text-white d-flex justify-content-end gap-2 ms-0"
              >
                <MdOutlineFavorite className="bookmark_icon text-danger" />
              </Button>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => (
                <Tooltip {...props}>Add to Favourites</Tooltip>
              )}
              placement="bottom"
            >
              <Button
                onClick={(e) => addFavourite(e, item.id, type)}
                className="btn-outline  fav-btn text-white d-flex justify-content-end gap-2 ms-0"
              >
                <MdOutlineFavoriteBorder className="bookmark_icon" />
              </Button>
            </OverlayTrigger>
          )}
        </>
      )}

      {kind === "dropdown" && (
        <Dropdown className="list-dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <BiPlus className="icon" /> &nbsp;Add List
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <button
                onClick={(e) => addBookMark(e, item.id, type)}
                className=" btn icon-container bookmark bookmark-btn"
              >
                {bookmarkedIds.includes(item.id && item.id.toString()) ? (
                  <>
                    Remove from WishList&nbsp;
                    <MdOutlineBookmark className="bookmark_icon text-secondry" />
                  </>
                ) : (
                  <>
                    Add to WishList&nbsp;
                    <MdOutlineBookmarkBorder className="bookmark_icon" />
                  </>
                )}
              </button>
            </Dropdown.Item>
            <Dropdown.Item>
              <button
                onClick={(e) => addFavourite(e, item.id, type)}
                className=" btn icon-container bookmark  fav-btn"
              >
                {favouriteIds.includes(item.id && item.id.toString()) ? (
                  <>
                    Remove from Favourites&nbsp;
                    <MdOutlineFavorite className="bookmark_icon text-danger" />
                  </>
                ) : (
                  <>
                    Add to Favourites&nbsp;
                    <MdOutlineFavoriteBorder className="bookmark_icon" />
                  </>
                )}
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

export default BfwButton;
