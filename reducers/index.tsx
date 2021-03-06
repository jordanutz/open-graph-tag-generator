import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";

import { renderMeta } from "../utils/renderMeta";
import { filterOptions } from "../utils/filterOptions";
import { formatValue } from "../utils/formatValue";

import { Tag } from "../types/components";
import { ActionProps, StateProps } from "../types/state";

export const initialState: StateProps = {
  title: "",
  description: "",
  url: "",
  tags: [],
  options: [
    "Audio",
    "Description",
    "Determiner",
    "Image",
    "Locale",
    "Site Name",
    "Title",
    "Video",
  ],
  property: "",
  content: "",
  generatedTags: null,
  hasSubmit: false,
};

export const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "HANDLE_ADD_TAG":
      {
        const { payload } = action;
        const { property, content } = payload;

        payload.e.preventDefault();

        const tag = {
          property,
          content,
        };

        const tags = [...state.tags, tag];
        const options = filterOptions([...state.options], tags);
        const initialValue = formatValue(options[0], true);

        return {
          ...state,
          tags,
          options,
          property: initialValue,
          content: "",
        };
      }
      break;
    case "HANDLE_DELETE_TAG":
      {
        const tagsArr = [...state.tags];
        const deletedIndex = tagsArr.findIndex(
          (tag) => tag.property === action.payload.property
        );

        tagsArr.splice(deletedIndex, 1);

        return {
          ...state,
          tags: tagsArr,
        };
      }
      break;
    case "HANDLE_USER_INPUT":
      {
        const { payload } = action;
        const { target } = payload;

        return { ...state, [target.name]: target.value };
      }
      break;

    case "HANDLE_SUBMIT":
      {
        const { payload } = action;
        const { tags, title, description, url } = state;

        payload.preventDefault();

        const setTags = (tags: Tag[]) => {
          let metaTags = {};

          tags.forEach((tag: Tag) => {
            const { property, content } = tag;
            metaTags = { ...metaTags, [property]: content };
          });

          return metaTags;
        };

        const meta = {
          title,
          description,
          "og:url": url,
          ...setTags(tags),
        };

        const generatedTags = renderMeta(meta)
          .map((tag: ReactElement) => ReactDOMServer.renderToString(tag) + "\n")
          .join("");

        return {
          ...state,
          generatedTags,
          hasSubmit: true,
        };
      }
      break;

    case "HANDLE_RESET":
      {
        return {
          ...state,
          ...initialState,
        };
      }
      break;
    default:
      return { ...state };
  }
};
