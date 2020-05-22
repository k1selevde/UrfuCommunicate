const registerDictionary = {
        wrong_fio: 'ФИО введено неверно',
        wrong_email: 'Введите корректный email',
        wrong_group_and_checkbox: 'Определитесь кто вы?',
        wrong_password: 'Введите валидный пароль',
        wrong_repeatPassword: 'Пароли не совпадают',
}


export function simpleValidRegister({name, surname,patronymic,email,group,checkbox,password,repeatPassword}) {
    return ((Boolean(name) && Boolean(surname) && Boolean(patronymic)
        && Boolean(email) && Boolean(password) && Boolean(repeatPassword))  && Boolean(group) || Boolean(checkbox))
}


export function validRegisterForm({name, surname,patronymic,email,group,checkbox,password,repeatPassword}) {
    if (!Boolean(name) || !Boolean(surname) || !Boolean(patronymic))
        return registerDictionary.wrong_fio;
    else if (!testEmail(email))
        return registerDictionary.wrong_email
    else if (testGroupCheckbox(group,checkbox))
        return registerDictionary.wrong_group_and_checkbox;
    else if (testPassword(password))
        return registerDictionary.wrong_password;
    else if (password !== repeatPassword)
        return registerDictionary.wrong_repeatPassword;
    else return ''
}



export function validAuth({email,password}) {
    if (!testEmail(email))
        return registerDictionary.wrong_email
    else if (testPassword(password))
        return registerDictionary.wrong_password;
    else return '';
}

export function simpleValidAuth({email,password}) {
    return (Boolean(email) && Boolean(password))
}





const testEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const testGroupCheckbox =  (group,checkbox) => {
    return Boolean(group) && checkbox
}

const testPassword = (password) => {
    return password.length < 5
}

