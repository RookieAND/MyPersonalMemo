import React, { useReducer } from "react";

import { ExampleMemo } from "constants/ExampleMemo";
import Memo from "components/main/memo/Memo";

export const MemoDispatch = React.createContext(null);

const reducer = (state, action) => {
	switch (action.type) {
		case "CREATE_CATEGORY":
			return [...state, action.content];

		case "REMOVE_CATEGORY":
			return state.filter((memoList) => memoList.category !== action.category);

		// id 를 발급하는 로직 : 가장 마지막에 위치한 ID + 1 [추후 리팩터링 예정]
		case "CREATE_MEMO":
			return state.map((memoList) =>
				memoList.category === action.category
					? {
							...memoList,
							memo: [
								...memoList.memo,
								{
									...action.newMemo,
									id:
										memoList.memo.length === 0
											? 1
											: memoList.memo[memoList.memo.length - 1].id + 1,
								},
							],
					  }
					: memoList
			);

		case "REMOVE_MEMO":
			return state.map((memoList) =>
				memoList.category === action.category
					? {
							...memoList,
							memo: memoList.memo.filter((memo) => memo.id !== action.id),
					  }
					: memoList
			);

		case "MODIFY_MEMO":
			return state.map((memoList) =>
				memoList.category === action.category
					? {
							...memoList,
							memo: memoList.memo.map((memo) =>
								memo.id === action.id ? action.modifiedMemo : memo
							),
					  }
					: memoList
			);

		default:
			return state;
	}
};

export const MemoContainer = () => {
	const [state, dispatch] = useReducer(reducer, ExampleMemo);

	return (
		<MemoDispatch.Provider value={dispatch}>
			<Memo mainMemo={state} />
		</MemoDispatch.Provider>
	);
};
