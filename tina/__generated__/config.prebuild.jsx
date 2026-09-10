// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "master";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "",
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "assets/img",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        format: "md",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: false,
            // Example of using a custom slugify function
            slugify: (values) => {
              const date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
              const title = values?.title || "new-post";
              const slug = title.toLowerCase().replace(/[^a-zA-Z0-9가-힣]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
              return `${date}-${slug}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout"
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags"
          },
          {
            type: "boolean",
            name: "comments",
            label: "Comments"
          },
          {
            type: "boolean",
            name: "share",
            label: "Share"
          },
          {
            type: "boolean",
            name: "related",
            label: "Related"
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
