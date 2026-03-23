package kr.co.iei.subject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.subject.model.service.SubjectService;
import kr.co.iei.subject.model.vo.Item;
import kr.co.iei.subject.model.vo.Subject;

@CrossOrigin(value="*")
@RestController
@RequestMapping(value="/subjects")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;
	
	@GetMapping
	public ResponseEntity<?> selectAll(@ModelAttribute Item request) {
		List<Subject> subject = subjectService.selectAll(request); 
		return ResponseEntity.ok(subject);
	}
	
	@GetMapping(value="/{level}")
	public ResponseEntity<?> selectAll(@RequestParam Integer level) {
		List<Subject> subject = subjectService.selectAlllevel(level); 
		return ResponseEntity.ok(subject);
	}
}
