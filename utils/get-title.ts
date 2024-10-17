const TITLE_TEMPLATE = "%s | Saryu Site";

export default function getTitle(title: string = "Home") {
  return TITLE_TEMPLATE.replace("%s", title);
}
