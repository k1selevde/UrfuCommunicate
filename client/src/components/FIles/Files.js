import React from 'react'
import s from './Files.module.css'

const Files  = ({files,teamId,getFile}) => {

    const getFileHandler = (fileName,e) => {
        e.preventDefault()
        console.log('(GET FILE HANDLER!11!!!)fileName is :', fileName, 'id: ', teamId)
        getFile({teamId,fileName})

    }

    return (
        <div className={s.filesContainer}>
            {files.map(({fileName,filePath,getFileStatus}) => (
                <div
                    key={fileName}
                    className={s.fileWrap}
                >
                    <div className={s.fileIcon}></div>
                    <a
                        target="_blank"
                        href={filePath ? filePath : '#'}
                        className={ getFileStatus ? s.fileNameGet : s.fileName}
                    >
                        {fileName}
                    </a>
                    <button
                        className={getFileStatus ? s.fileGetBtnDoes : s.fileGetBtn}
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