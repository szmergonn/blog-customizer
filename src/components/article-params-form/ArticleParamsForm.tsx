import { useState, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

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
    // Состояние для открытия/закрытия формы
    const [isOpen, setIsOpen] = useState(false);
    
    // Состояние для временного хранения настроек формы
    const [formState, setFormState] = useState<ArticleStateType>(articleState);

    // Обновляем formState при изменении articleState
    useEffect(() => {
        setFormState(articleState);
    }, [articleState]);

    // Обработчик открытия/закрытия формы
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Обработчик клика вне формы (закрытие формы)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const form = document.querySelector(`.${styles.container}`);
            const arrowButton = document.querySelector('[aria-label="Открыть/Закрыть форму параметров статьи"]');

            // Если клик был вне формы и вне кнопки-стрелки, то закрываем форму
            if (isOpen && form && !form.contains(target) && arrowButton && !arrowButton.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Обработчик применения настроек
    const handleApply = (e: FormEvent) => {
        e.preventDefault();
        setArticleState(formState);
    };

    // Обработчик сброса настроек
    const handleReset = () => {
        // Сбрасываем форму к начальным значениям
        setFormState(defaultArticleState);
        // И сразу применяем изменения к статье
        setArticleState(defaultArticleState);
    };

    return (
        <>
            <ArrowButton isOpen={isOpen} onClick={handleToggle} />
            <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
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
                    
                    <RadioGroup
                        title="Ширина контента"
                        name="contentWidth"
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