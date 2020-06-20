import React from 'react'
import cn from 'classnames';
import s from './Files.module.css'

const Files  = ({files,teamId,getFile,isDayTheme}) => {

    const getFileHandler = (fileName,e) => {
        e.preventDefault()
        console.log('(GET FILE HANDLER!11!!!)fileName is :', fileName, 'id: ', teamId)
        getFile({teamId,fileName})

    }

    return (
        <div className={s.filesContainer}>
            {files && files.map(({fileName,filePath,getFileStatus}) => (
                <div
                    key={fileName}
                    className={s.fileWrap}
                >
                    <div className={s.fileIcon}></div>
                    <a
                        target="_blank"
                        href={filePath ? filePath : '#'}
                        className={cn(
                            {[s.fileNameGet]: getFileStatus},
                            {[s.fileName]: !getFileStatus},
                            {[s.fileName__light]: isDayTheme}

                        )}
                    >
                        {fileName}
                    </a>
                    <button
                        className={cn(
                            {[s.fileGetBtnDoes]: getFileStatus },
                            {[s.fileGetBtn]: !getFileStatus },
                            {[s.fileGetBtn__light]: isDayTheme && !getFileStatus},
                            )
                        }
                        onClick={(e) => getFileHandler(fileName,e)}
                    >
                        {getFileStatus ? 'Файл получен' : 'Получить файл'}
                    </button>
                </div>
            )
            )}
        </div>

    );
}

export default Files;