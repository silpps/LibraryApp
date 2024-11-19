

//tähän oikeest joku mist se hakee täs vaan mun mockdataa ku vielä ei oo mtn, ideaalisti tää parsettais datafilest, listasta, jne

const WishlistBooks = () => {
    return (
        <div>
            <h1>Book List</h1>
            <Book title="I'm done" author="Fuzzy Lumpkins" rating={5} />
            <Book title="Introduction to Mouse genetics" author="Veve" rating={4} />
            <Book title="JuuhJaah" author="Pöö" />
        </div>
    );
  };
