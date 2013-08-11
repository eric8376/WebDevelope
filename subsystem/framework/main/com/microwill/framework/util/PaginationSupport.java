package com.microwill.framework.util;



import java.util.Iterator;
import java.util.List;


public class PaginationSupport {

	public final static int PAGESIZE = 10;

	private int pageSize = PAGESIZE;

	private int pageNumber;

	private int totalCount = 0;

	private boolean reCount = true;

	private List items;

	public PaginationSupport() {
	}

	public PaginationSupport(int pageNumber, int pageSize) {
		setPageSize(pageSize);
		setPageNumber(pageNumber);
	}

	public PaginationSupport(List items, int totalCount, int pageNumber, int pageSize, boolean reCount) {
		setPageSize(pageSize);
		setTotalCount(totalCount);
		setItems(items);
		System.out.println(items.size());
		setPageNumber(pageNumber);
		recomputePageNumber();
		setReCount(reCount);
	}

	private void recomputePageNumber() {
		if (Integer.MAX_VALUE == this.pageNumber || this.pageNumber > getLastPageNumber()) { // last
			this.pageNumber = getLastPageNumber();
		}
	}

	public List getItems() {
		return items;
	}

	public void setItems(List items) {
		this.items = items;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public boolean isReCount() {
		return reCount;
	}

	public void setReCount(boolean reCount) {
		this.reCount = reCount;
	}

	public int getDisPageNumber() {
		return getPageNumber() + 1;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public boolean isFirstPage() {
		return getPageNumber() == 0;
	}

	public boolean isLastPage() {
		return getPageNumber() + 1 >= getDisLastPageNumber();
	}

	public boolean hasNextPage() {
		return getLastPageNumber() > getPageNumber() + 1;
	}

	public boolean hasPreviousPage() {
		return getPageNumber() > 0;
	}

	public int getFirstPageNumber() {
		return 0;
	}

	public int getDisLastPageNumber() {
		return getLastPageNumber();
	}

	public int getLastPageNumber() {
		// template.lang.ArithmeticException: / by zero
		if (0 == this.pageSize) {
			return 0;
		}
		return totalCount % this.pageSize == 0 ? totalCount / this.pageSize : totalCount / this.pageSize + 1;
	}

	public int getFirstItemNumber() {
		return getPageNumber() * getPageSize() + 1;
	}

	public int getLastItemNumber() {
		int fullPage = getFirstItemNumber() + getPageSize() - 1;
		return getTotalCount() < fullPage ? getTotalCount() : fullPage;
	}

	public int getNextPageNumber() {
		return getPageNumber() + 1;
	}

	public int getPreviousPageNumber() {
		return getPageNumber() - 1;
	}

	public Iterator iterator() {
		if (null != getItems() && !getItems().isEmpty()) {
			return getItems().iterator();
		} else {
			throw new UnsupportedOperationException("iterator() method is unsupported");
		}
	}

}
