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

		case "CREATE_MEMO":
			return state.map((memoList) =>
				memoList.category === action.category
					? {
							...memoList,
							memo: [...memoList.memo, action.newMemo],
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
								memo.id !== action.id
									? {
											title: action.title,
											decs: action.desc,
									  }
									: memo
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
