import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { GithubUserListData, UseDataListT } from "./types";

const useDataList = (): UseDataListT => {
  const { isIntersecting, ref: infiniteScrollRef } = useIntersectionObserver();
  const [pageNumber, setPageNumber] = useState(() => {
    const localPageNumber = Number(localStorage.getItem('githubPageNumber')) || 1
    return localPageNumber;
  });

  const [list, setList] = useState(() => {
    const localList = localStorage.getItem('githubList');
    return localList ? JSON.parse(localList) : [];
  });
  const [loading, setLoading] = useState(false);

  const fetchUrl = `https://api.github.com/orgs/mozilla/members?page=${pageNumber}`;
  const fetchList = async () => {
    setLoading(true);
    const listResponse = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer tokenHere` //got rate limited, had to use token
      }
    });
    const listData: GithubUserListData = await listResponse.json();
    const userNames = listData.map(user => user.login);
    const updatedList = [...list, ...userNames];
    const updatedPageNumber = pageNumber + 1;
    //TODO: in case of an error (like rate limiting) the API returns nothing. In this case the page number shouldn't be updated. A button to retry can be shown instead maybe
    setList(updatedList);
    setPageNumber(updatedPageNumber);
    localStorage.setItem('githubPageNumber', `${updatedPageNumber}`);
    localStorage.setItem('githubList', JSON.stringify(updatedList));
    setLoading(false);
  }

  // fetch initial list
  useEffect(() => {
    if (loading) {
      return;
    }

    if (pageNumber === 1) {
      fetchList();
    }
  }, []);

  // update list whenever we reach the end
  useEffect(() => {
    if (loading) {
      return;
    }
    if (isIntersecting) {
      fetchList();
    }
  }, [isIntersecting])

  return { list, loading, infiniteScrollRef };
};

export default useDataList