package kr.co.iei.subject.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.iei.subject.model.vo.Item;
import kr.co.iei.subject.model.vo.Subject;

@Mapper
public interface SubjectDao {

	List<Subject> selectAll(Item request);

	List<Subject> selectAlllevel(Integer level);

}
