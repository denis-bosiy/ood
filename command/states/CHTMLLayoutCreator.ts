export class CHTMLLayoutCreator {
    private m_title: string;
    private m_layoutText: string[];

    constructor(title: string = "Здесь могла бы быть ваша реклама") {
        this.m_title = title;
        this.m_layoutText = [];
    }

    public setTitle(title: string): void {
        this.m_title = title;
    }

    public addParagraph(text: string): void {
        this.m_layoutText.push("<div>" + text + "</div>");
    }

    public addImage(path: string, width: number, height: number): void {
        this.m_layoutText.push("<img src=\"" + path + "\" width=\"" + width + "\" height=\"" + height + "\" />");
    }

    public createHTMLLayout(): string {
        let htmlLayout = "";

        htmlLayout += "<!DOCTYPE html>\n";
        htmlLayout += "<html lang=\"ru\">\n";
        htmlLayout += this.getHead();
        htmlLayout += "<body>\n";
        this.m_layoutText.forEach((layoutText: string) => {
            htmlLayout += "  ";
            htmlLayout += layoutText;
            htmlLayout += "\n";
        });
        htmlLayout += "</body>\n";
        htmlLayout += "</html>";

        return htmlLayout;
    }

    private getHead(): string {
        return "<head>\n" +
        "  <meta charset=\"utf-8\">\n" +
        "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
        "  <title>" + this.m_title + "</title>\n" +
        "  <meta property=\"og:title\" content=\"Заголовок страницы в OG\">\n" +
        "  <meta property=\"og:description\" content=\"Описание страницы в OG\">\n" +
        "  <meta property=\"og:image\" content=\"https://example.com/image.jpg\">\n" +
        "  <meta property=\"og:url\" content=\"https://example.com/\">\n" +
        "</head>\n"
    }
}