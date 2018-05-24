import { bootstrap, Injectable, Component, construct, INJECTABLE_STORE, INSTANCE_STORE } from "../index";

abstract class Hero {
    abstract getCharactor(): string;
    abstract getAbility(): string[];
}

@Injectable()
class Ironman extends Hero{
    getCharactor() {
        return 'Robert Donnie Jr';
    }
    getAbility() {
        return ['electromagnetic pulse', 'magnetic fields', 'missles', 'pulse bolts'];
    }
}

@Injectable()
class Thor extends Hero{
    getCharactor() {
        return 'Chris Hemsworth';
    }
    getAbility() {
        return ['Thunder attack', 'Thunder hammer']
    }
}

@Injectable()
class CaptianAmerica extends Hero{
    getCharactor() {
        return 'Chris Evans';
    }
    getAbility() {
        return ['field', 'super power']
    }
}


bootstrap({
    provider:[
        Ironman,
        Thor,
        CaptianAmerica
    ]
});


@Component()
class Avenager {
    constructor(
        private ironman: Ironman,
        private thor: Thor,
        private captain: CaptianAmerica
    ) {
        console.log(`The Ironman was play by ${ this.ironman.getCharactor() }, and its abilities are ${ this.ironman.getAbility().join(', ') }`);
        console.log(`The Thor was play by ${ this.thor.getCharactor() }, and its abilities are ${ this.thor.getAbility().join(', ') }`);
        console.log(`The Captain America was play by ${ this.captain.getCharactor() }, and its abilities are ${ this.captain.getAbility().join(', ') }`);
    }
}

var avenagers = construct(Avenager);