import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import BookListHeader from "./BookListHeader";
import Bookshelf from "./Bookshelf";

class BookListPage extends Component {
  state = {
    booksCurrentlyReading: [
      {
        title: "To Kill a Mockingbird",
        authors: ["Harper Lee"],
        coverUrl:
          "id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y",
      },
      {
        title: "Ender's Game",
        authors: ["Orson Scott Card"],
        coverUrl:
          "id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN",
      },
    ],
    booksWantToRead: [
      {
        title: "1776",
        authors: ["David McCullough"],
        coverUrl:
          "id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX",
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        authors: ["J.K. Rowling"],
        coverUrl:
          "id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB",
      },
    ],
    booksRead: [
      {
        title: "The Hobbit",
        authors: ["J.R.R. Tolkien"],
        coverUrl:
          "id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk",
      },
      {
        title: "Oh, the Places You'll Go!",
        authors: ["Seuss"],
        coverUrl:
          "id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8",
      },
      {
        title: "The Adventures of Tom Sawyer",
        authors: ["Mark Twain", "Clement"],
        coverUrl:
          "id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi",
      },
    ],
  };

  handleChangeBookshelf = () => {};

  componentDidMount() {
    // BooksAPI.getAll().then((books) => {
    //   this.setState(() => ({
    //     books,
    //   }));
    // });
  }

  render() {
    const { booksCurrentlyReading, booksWantToRead, booksRead } = this.state;
    return (
      <div className="list-books">
        <BookListHeader />
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              books={booksCurrentlyReading}
              onChangeBookshelf={this.handleChangeBookshelf}
            />
            <Bookshelf
              title="Want to Read"
              books={booksWantToRead}
              onChangeBookshelf={this.handleChangeBookshelf}
            />
            <Bookshelf
              title="Read"
              books={booksRead}
              onChangeBookshelf={this.handleChangeBookshelf}
            />
          </div>
        </div>

        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default BookListPage;
