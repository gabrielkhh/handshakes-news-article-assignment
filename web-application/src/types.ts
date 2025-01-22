export type Article = {
    _id: string;
    title: string;
    summary: string;
    timestamp: number;
    publisher: string;
};

export type NewArticle = {
    title: string;
    summary: string;
    timestamp: number;
    publisher: string;
};

export type ArticleFormFields = {
    title: string;
    summary: string;
    publisher: string;
    timestamp: number;
}

export type GetArticlesResponse = {
    success: boolean;
    data: Article[];
    message?: string;
}

export type GetSingleArticleResponse = {
    success: boolean;
    data?: Article;
    message?: string;
}

export type CreateArticleResponse = {
    success: boolean;
    data?: NewArticle;
    message?: string;
}

export type UpdateArticleResponse = {
    success: boolean;
    data?: Article;
    message?: string;
}

export type DeleteArticleResponse = {
    success: boolean;
    message?: string;
}