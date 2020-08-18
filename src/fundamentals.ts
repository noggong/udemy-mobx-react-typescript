import {action, autorun, computed, observable, reaction, when} from "mobx";

interface IPerson {
    firstName: string;
    lastName: string;
}

class Person {
    @observable
    firstName: string = 'Mobx';
    @observable
    lastName: string = 'React';
    @observable
    age: number = 15;
    @observable
    isAlive: boolean = true;
    @observable
    dollars: number = 5;

    constructor(props: IPerson) {
        Object.assign(this, props);

        when(
            () => this.age > 99,
            () => this.bury()
        )
    }

    @action
    bury() {
        this.isAlive = false;
    }

    @action
    setAge(age: number) {
        this.age = age;
    }

    @action
    updateFullName(name: string, lastName: string) {
        this.firstName = name;
        this.lastName = lastName;
    }

    @computed
    get euors() {
        console.log(`Calculating Euros!`);
        return this.dollars * 2;
    }

    @action
    withdrawl() {
        this.dollars -= 1;
    }
}

const ourPerson = new Person({
    firstName: 'Mobx',
    lastName: 'React'
});

autorun(() => {
    console.log(`${ourPerson.euors}`);
});

ourPerson.withdrawl();
ourPerson.withdrawl();
ourPerson.withdrawl();




