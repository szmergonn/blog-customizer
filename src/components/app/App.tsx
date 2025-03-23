import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
    // Создаем состояние для стилей статьи
    const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

    return (
        <main
            className={styles.main}
            style={
                {
                    '--font-family': articleState.fontFamilyOption.value,
                    '--font-size': articleState.fontSizeOption.value,
                    '--font-color': articleState.fontColor.value,
                    '--container-width': articleState.contentWidth.value,
                    '--bg-color': articleState.backgroundColor.value,
                } as CSSProperties
            }
        >
            <ArticleParamsForm
                articleState={articleState}
                setArticleState={setArticleState}
            />
            <Article />
        </main>
    );
};