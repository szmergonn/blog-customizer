import { useState, useEffect, FormEvent, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useClose } from 'src/hooks/useClose';

import { 
    ArticleStateType, 
    fontFamilyOptions, 
    fontSizeOptions, 
    fontColors,
    backgroundColors,
    contentWidthArr,
    defaultArticleState
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
    articleState: ArticleStateType;
    setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, setArticleState }: ArticleParamsFormProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [formState, setFormState] = useState<ArticleStateType>(articleState);
    
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFormState(articleState);
    }, [articleState]);

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
    };

    useClose({
        isOpen: isMenuOpen,
        onClose: handleClose,
        rootRef: formRef
    });

    const handleApply = (e: FormEvent) => {
        e.preventDefault();
        setArticleState(formState);
    };

    const handleReset = () => {
        setFormState(defaultArticleState);
        setArticleState(defaultArticleState);
    };

    return (
        <>
            <ArrowButton isOpen={isMenuOpen} onClick={handleToggle} />
            <aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })} ref={formRef}>
                <form className={styles.form} onSubmit={handleApply}>
                    <Text as="h2" weight={800} size={31} uppercase>
                        Задайте параметры
                    </Text>
                    
                    <Select
                        title="Шрифт"
                        selected={formState.fontFamilyOption}
                        options={fontFamilyOptions}
                        onChange={(option) => setFormState({...formState, fontFamilyOption: option})}
                    />
                    
                    <RadioGroup
                        title="Размер шрифта"
                        name="fontSize"
                        selected={formState.fontSizeOption}
                        options={fontSizeOptions}
                        onChange={(option) => setFormState({...formState, fontSizeOption: option})}
                    />
                    
                    <Select
                        title="Цвет шрифта"
                        selected={formState.fontColor}
                        options={fontColors}
                        onChange={(option) => setFormState({...formState, fontColor: option})}
                    />
                    
                    <Separator />
                    
                    <Select
                        title="Цвет фона"
                        selected={formState.backgroundColor}
                        options={backgroundColors}
                        onChange={(option) => setFormState({...formState, backgroundColor: option})}
                    />
                    
                    <Select
                        title="Ширина контента"
                        selected={formState.contentWidth}
                        options={contentWidthArr}
                        onChange={(option) => setFormState({...formState, contentWidth: option})}
                    />
                    
                    <div className={styles.bottomContainer}>
                        <Button 
                            title="Сбросить" 
                            htmlType="button" 
                            type="clear" 
                            onClick={handleReset} 
                        />
                        <Button 
                            title="Применить" 
                            htmlType="submit" 
                            type="apply" 
                        />
                    </div>
                </form>
            </aside>
        </>
    );
};